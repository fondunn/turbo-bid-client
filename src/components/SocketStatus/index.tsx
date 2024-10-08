'use client'
import { FC, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

const SocketStatus: FC = () => {
	const [isConnected, setIsConnected] = useState(false)
	const [transport, setTransport] = useState('N/A')
	const socket = io('http://localhost:8881')
	useEffect(() => {
		if (socket.connected) {
			onConnect()
		}

		function onConnect() {
			setIsConnected(true)
			setTransport(socket.io.engine.transport.name)

			socket.io.engine.on('upgrade', transport => {
				setTransport(transport.name)
			})
		}

		function onDisconnect() {
			setIsConnected(false)
			setTransport('N/A')
		}

		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
		}
	}, [])

	return (
		<div>
			<p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
			<p>Transport: {transport}</p>
		</div>
	)
}

export default SocketStatus
