import { shallow } from "enzyme";
import React from 'react';
import { Provider } from 'react-redux';
import store from './../redux/store';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

window.URL.createObjectURL = jest.fn();
configure({ adapter: new Adapter(), });

it("Renders without crashing", () => {
    // pushes
    // shallow(<Provider store={store}><App /></Provider>);
});