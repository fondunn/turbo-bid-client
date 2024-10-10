// useAuctionTimer.ts
import {
	differenceInSeconds,
	Duration,
	intervalToDuration,
	isBefore,
} from 'date-fns'
import { useEffect, useState } from 'react'

export const useAuctionTimer = (start_date: string, end_date: string) => {
	const [timeLeft, setTimeLeft] = useState<string | null>(null)
	const [isAuctionStarted, setIsAuctionStarted] = useState(false)

	useEffect(() => {
		const startDate = new Date(start_date)
		const endDate = new Date(end_date)
		const formatTimeLeft = (duration: Duration, showSeconds: boolean) => {
			const { days, hours, minutes, seconds } = duration
			let formatted = ''
			if (days) formatted += `${days}д `
			if (hours) formatted += `${hours}г `
			if (minutes) formatted += `${minutes}хв `
			if (showSeconds && seconds !== undefined) formatted += `${seconds}с`

			return formatted.trim()
		}
		const updateTimer = () => {
			const currentTime = new Date()

			if (isBefore(currentTime, startDate)) {
				const duration = intervalToDuration({
					start: currentTime,
					end: startDate,
				})
				const secondsLeft = differenceInSeconds(startDate, currentTime)
				const showSeconds = secondsLeft < 60
				setTimeLeft(formatTimeLeft(duration, showSeconds))
				setIsAuctionStarted(false)
			} else if (isBefore(currentTime, endDate)) {
				const duration = intervalToDuration({
					start: currentTime,
					end: endDate,
				})
				const secondsLeft = differenceInSeconds(endDate, currentTime)
				const showSeconds = secondsLeft < 60
				setTimeLeft(formatTimeLeft(duration, showSeconds))
				setIsAuctionStarted(true)
			} else {
				setTimeLeft('Аукціон завершений')
			}
		}

		updateTimer()
		const timer = setInterval(updateTimer, 1000)

		return () => clearInterval(timer)
	}, [start_date, end_date])

	return { timeLeft, isAuctionStarted }
}
