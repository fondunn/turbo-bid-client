'use client'
import { FC, useEffect, useState } from 'react'

import { io } from 'socket.io-client'
type Status = 'connected' | 'disconnected' | 'N/A'

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
	const status = isConnected ? 'connected' : 'disconnected'
	return (
		<div className='fixed bottom-4 right-4 flex justify-center items-center gap-2'>
			<p>status:</p> <Pin status={status} />
		</div>
	)
}

export default SocketStatus

const Pin = ({ status }: { status: Status }) => {
	switch (status) {
		case 'connected':
			return <div className='w-4 h-4 bg-green-500 rounded-full'></div>
		case 'disconnected':
			return <div className='w-4 h-4 bg-red-500 rounded-full'></div>
		default:
			return <div className='w-4 h-4 bg-gray-500 rounded-full'></div>
	}
}
