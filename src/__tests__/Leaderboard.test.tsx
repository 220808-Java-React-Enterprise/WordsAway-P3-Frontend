import React from 'react'
import Leaderboard, {getLeaders, getRank} from '../components/Leaderboard'
import '@testing-library/jest-dom/extend-expect'
import ReactDOM from 'react-dom'
import { cleanup, render } from '@testing-library/react'
import renderer from "react-test-renderer"


    //for clearing overlapping tests
    afterEach(cleanup);
    jest.mock("../utils/ApiConfig")

    //syntax for checking if the div renders
    it('renders leaderboard without crashing', () => {
        const div = document.createElement("div");
        ReactDOM.render(<Leaderboard></Leaderboard>, div)
    })

    //syntax for checking labels inside tags
    it('renders leaderboard correctly', () => {
       const {getByTestId} = render(<Leaderboard/>)
       expect(getByTestId("leaderboard")).toBeEmptyDOMElement()
    })

    //syntax for checking if element jsonifies, creates a snapshot folder to check against
    //can save mulitple snapshots to check different props/labels
    it("matches snapshot", () => {
        const tree = renderer.create(<Leaderboard></Leaderboard>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should return an array of top ten', () =>{
        const result = getLeaders();
        console.log(result)
        expect(result).toBe([])
    })

    it('should return rank int', ()=>{
        const result = getRank();
        console.log(result)
        expect(result).toBe(Number)
    })