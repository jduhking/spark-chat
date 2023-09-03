
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { incremented, amountAdded } from "../features/counter/counter-slice";
import axios from 'axios';



export default function HomePage() {

  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  function handleClick() {
    dispatch(amountAdded(3))
  }
  return (
    <>
      <h1>Counter</h1>
      <button onClick={handleClick} >count is {count}</button>
    </>
  )
}

