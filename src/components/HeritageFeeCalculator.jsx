import React, { useState } from "react";
import "./HeritageFeeCalculator.css";

const HeritageFeeCalculator = () => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [totalPersons, setTotalPersons] = useState(0);
	const [adults, setAdults] = useState(0);
	const [minors, setMinors] = useState(0);
	const [totalDays, setTotalDays] = useState(0);
	const [totalFee, setTotalFee] = useState(0);

	const calculateDays = (inDate, outDate) => {
		if (inDate && outDate) {
			const start = new Date(inDate);
			const end = new Date(outDate);
			const diffTime = Math.abs(end - start);
			const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
			setTotalDays(days);
			return days;
		}
		return 0;
	};

	const handlePersonChange = (type, value) => {
		let num = parseInt(value) || 0;
		if (type === "adults") {
			if (num + minors > totalPersons) return;
			setAdults(num);
		} else {
			if (adults + num > totalPersons) return;
			setMinors(num);
		}
	};

	const calculateFee = () => {
		const days = calculateDays(checkIn, checkOut);
		const fee =
			adults * days * 200 + minors * days * 150 + totalPersons * 50;
		setTotalFee(fee);
	};

	return (
		<div className="container">
			<h2>Heritage Fee Calculator</h2>
			<div className="input-group">
				<label>Check-in Date:</label>
				<input
					type="date"
					value={checkIn}
					onChange={(e) => setCheckIn(e.target.value)}
				/>
			</div>
			<div className="input-group">
				<label>Check-out Date:</label>
				<input
					type="date"
					value={checkOut}
					onChange={(e) => setCheckOut(e.target.value)}
				/>
			</div>
			<div className="input-group">
				<label>Total Persons:</label>
				<input
					type="number"
					min="0"
					value={totalPersons}
					onChange={(e) =>
						setTotalPersons(parseInt(e.target.value) || 0)
					}
				/>
			</div>
			<div className="input-group">
				<label>Number of Adults (18+):</label>
				<input
					type="number"
					min="0"
					max={totalPersons - minors}
					value={adults}
					onChange={(e) =>
						handlePersonChange("adults", e.target.value)
					}
				/>
			</div>
			<div className="input-group">
				<label>Number of Minors (12-18):</label>
				<input
					type="number"
					min="0"
					max={totalPersons - adults}
					value={minors}
					onChange={(e) =>
						handlePersonChange("minors", e.target.value)
					}
				/>
			</div>
			<button onClick={calculateFee}>Calculate Total Fee</button>
			<div className="result">
				<p>
					Total Days: <b>{totalDays}</b>
				</p>
				<p>
					Total Heritage Fee: <b>₹{totalFee}</b>
				</p>
			</div>
		</div>
	);
};

export default HeritageFeeCalculator;
