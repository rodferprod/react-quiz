import { useReducer } from "react";

// Defining the shape of all states as an object
const initialStates = { count: 0, step: 1 };

function reducerFn(actualStates, action) {
	// What we're returning here will be the new value of the state.
	// return actualState + action;
	// When we send values from dispatch function the action param
	// will assume this values and the result will be the expected:
	// The actualState plus the action value will increase and decrease the value.
	// dispatch(-1); dispatch(1);
	// But, when we set the value from the input field with dispatch(Number(e.target.value));
	// the result is unexpected because the action value will be joined to the actualState value.

	// Verifying what's the action is comming to make the right decision.
	//if (action.type === "inc") return actualState + 1;
	//if (action.type === "dec") return actualState - 1;
	//if (action.type === "setCount") return action.count;

	// Now, we need to return an object with the same shape initialy defined.
	// For that, we're just spread all the actual states and replacing just the ones
	// needed based on the action received from the dispatch function.
	switch (action.type) {
		case "inc":
			return {
				...actualStates,
				count: actualStates.count + actualStates.step,
			};
		case "dec":
			return {
				...actualStates,
				count: actualStates.count - actualStates.step,
			};
		case "setCount":
			return { ...actualStates, count: action.count };
		case "setStep":
			return { ...actualStates, step: action.step };
		case "reset":
			return initialStates;
		default:
			throw new Error("Unknow action!");
	}
}

function DateCounter() {
	//const [step, setStep] = useState(1);
	//const [count, setCount] = useState(0);

	const [state, dispatch] = useReducer(reducerFn, initialStates);
	const { count, step } = state;

	// This mutates the date object.
	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + count);

	const dec = function () {
		// setCount((count) => count - 1);
		//setCount((count) => count - step);

		// This will send the value -1 to the action
		//dispatch(-1);

		// Here we're defining an object with descriptions
		// about what action is being executed to decide what
		// to do inside the reducerFn
		dispatch({ type: "dec" });
	};

	const inc = function () {
		// setCount((count) => count + 1);
		//setCount((count) => count + step);

		// This will send the value 1 to the action
		//dispatch(1);

		// Here we're defining an object with descriptions
		// about what action is being executed to decide what
		// to do inside the reducerFn
		dispatch({ type: "inc" });
	};

	const defineCount = function (e) {
		//setCount(Number(e.target.value));
		// This will send to the action the value inserted in the field
		//dispatch(Number(e.target.value));

		// Here we're defining an object with descriptions
		// about what action is being executed to decide what
		// to do inside the reducerFn
		dispatch({ type: "setCount", count: Number(e.target.value) });
	};

	const defineStep = function (e) {
		//setStep(Number(e.target.value));

		// Here we're defining an object with descriptions
		// about what action is being executed to decide what
		// to do inside the reducerFn
		dispatch({ type: "setStep", step: Number(e.target.value) });
	};

	const reset = function () {
		//setCount(0);
		//setStep(1);

		// Here we're defining an object with descriptions
		// about what action is being executed to decide what
		// to do inside the reducerFn
		dispatch({ type: "reset" });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
