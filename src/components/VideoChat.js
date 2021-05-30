import React,{ createRef, useState } from 'react';
import './App.css';
import firebase from '../firebase';

const firestore = firebase.firestore();




const servers = {
	iceServers: [
		{
			urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
		},
	],
	iceCandidatePoolSize: 10,
};

// global variables for peer connection and media streams
let pc, localStream, remoteStream;


function VideoChat() {
	const localVideoRef = createRef();
	const remoteVideoRef = createRef();
	const [webcamButtonDisabled, setWebcamButtonDisabled] = useState(false);
	const [callButtonDisabled, setCallButtonDisabled] = useState(true);
	const [answerButtonDisabled, setAnswerButonDisabled] = useState(true);
	const [hangUpButtonDisabled, setHangUpButtonDisabled] = useState(true);
	const [callID, setCallID] = useState('');

	// Setup media sources
	const webcamSetup = async () => {
		pc = await new RTCPeerConnection(servers);
		localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		remoteStream = new MediaStream();

		// Push tracks from local stream to peer connection
		localStream.getTracks().forEach((track) => {
			pc.addTrack(track, localStream);
		});

		// Pull tracks from remote stream, add to video stream
		pc.ontrack = (event) => {
			event.streams[0].getTracks().forEach((track) => {
				remoteStream.addTrack(track);
			});
		};

		console.log(localStream);
		console.log(remoteStream);
		localVideoRef.current.srcObject = localStream;
		remoteVideoRef.current.srcObject = remoteStream;
		localVideoRef.current.muted = true;

		setWebcamButtonDisabled(true);
		setCallButtonDisabled(false);
		setAnswerButonDisabled(false);
	}

	// Create call offer
	const createCall = async () => {
		// Reference Firestore collections for signaling
		const callDoc = firestore.collection('calls').doc();
		console.log(callDoc);
		const offerCandidates = callDoc.collection('offerCandidates');
		const answerCandidates = callDoc.collection('answerCandidates');

		setCallID(callDoc.id);

		// Get candidates for caller, save to db
		pc.onicecandidate = (event) => {
			event.candidate && offerCandidates.add(event.candidate.toJSON());
		};

		// Create offer
		const offerDescription = await pc.createOffer();
		await pc.setLocalDescription(offerDescription);

		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type,
		};

		await callDoc.set({ offer });

		// Listen for remote answer
		callDoc.onSnapshot((snapshot) => {
			const data = snapshot.data();
			if (!pc.currentRemoteDescription && data?.answer) { // "?." optional chaining
				const answerDescription = new RTCSessionDescription(data.answer);
				pc.setRemoteDescription(answerDescription);
			}
		});

		// When answered, add candidate to peer connection (remote stream)
		answerCandidates.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					const candidate = new RTCIceCandidate(change.doc.data());
					pc.addIceCandidate(candidate);
				}
			});
		});

		setHangUpButtonDisabled(false);
		setCallButtonDisabled(true);
		setAnswerButonDisabled(true);
	};

	// Answer the call with the unique ID
	const answerCall = async () => {
		const callDoc = firestore.collection('calls').doc(callID);
		const result = await callDoc.get();
		if (!result.exists) {
			console.log('document does not exist!');
			alert('Invalid call ID! Please try again.');
			return;
		}
			
		console.log('why does it keep going');
		const answerCandidates = callDoc.collection('answerCandidates');
		const offerCandidates = callDoc.collection('offerCandidates');

		pc.onicecandidate = (event) => {
			event.candidate && answerCandidates.add(event.candidate.toJSON());
		};

		const callData = (await callDoc.get()).data();

		const offerDescription = callData.offer;
		await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

		const answerDescription = await pc.createAnswer();
		await pc.setLocalDescription(answerDescription);

		const answer = {
			type: answerDescription.type,
			sdp: answerDescription.sdp,
		};

		await callDoc.update({ answer });

		// add caller to the peer connection (remote stream)
		offerCandidates.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				console.log(change);
				if (change.type === 'added') {
					let data = change.doc.data();
					pc.addIceCandidate(new RTCIceCandidate(data));
				}
			});
		});

		setHangUpButtonDisabled(false);
		setCallButtonDisabled(true);
		setAnswerButonDisabled(true);
	};

	const hangUp = () => {
		localStream.getTracks().forEach((track) => {
			track.stop();
		});
		remoteStream.getTracks().forEach((track) => {
			track.stop();
		});
		pc.close();
		pc = null;

		localVideoRef.current.srcObject = null;
		remoteVideoRef.current.srcObject = null;
		
		// deleteCallDoc(callID);
		setCallID('');

		console.log('call ended')

		setHangUpButtonDisabled(true);
		setWebcamButtonDisabled(false);
	}

	// const deleteCallDoc = (id) => {
	// 	Firebase.firestore().collection('calls').doc(id).delete().then(function() {
	// 		console.log('Document successfully deleted!');
	// 	}).catch(function(error) {
	// 		console.error('Error removing document: ', error);
	// 	});
	// }

	return (
		<div className="App">
			<header className="App-header">
				<h1>Video Chat App</h1>
			</header>
			<div className="videos">
				<span>
					<h3>Local Stream</h3>
					<video id="webcamVideo" ref={localVideoRef} autoPlay playsInline></video>
				</span>
				<span>
					<h3>Remote Stream</h3>
					<video id="remoteVideo" ref={remoteVideoRef} autoPlay playsInline></video>
				</span>
			</div>
			<button id="webcamButton" disabled={webcamButtonDisabled} onClick={webcamSetup}>Start webcam</button>
			<div className="buttons">
				<span>
					<h2>Create a new call</h2>
					<button id="callButton" disabled={callButtonDisabled} onClick={createCall}>Create Call</button>
				</span>
				<span>
					<h2>Join from another browser</h2>
					<input id="callInput" placeholder="Enter Unique ID" value={callID} onChange={e => setCallID(e.target.value)} />
					<button id="answerButton" disabled={answerButtonDisabled} onClick={answerCall}>Answer</button>
				</span>
				<span>
					<h2>End the call</h2>
					<button id="hangupButton" disabled={hangUpButtonDisabled} onClick={hangUp}>Hangup</button>
				</span>
			</div>
		</div>
	);
}

export default VideoChat;