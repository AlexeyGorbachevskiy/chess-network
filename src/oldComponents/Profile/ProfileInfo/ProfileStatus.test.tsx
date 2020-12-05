import React from 'react';
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";

describe('ProfileStatus Component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status={'New Status'} updateStatus={() => {
        }}/>)
        const instance: any = component.getInstance();
        expect(instance.state.status).toBe('New Status');

    })
    test('<p/> element should be displayed after creation', () => {
        const component = create(<ProfileStatus status={'New Status'} updateStatus={() => {
        }}/>)
        const root = component.root;
        let p = root.findByType('p');
        expect(p).not.toBeNull();
    })
    test('<input/> shouldn\'t be displayed after creation', () => {
        const component = create(<ProfileStatus status={'New Status'} updateStatus={() => {
        }}/>)
        const root = component.root;
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })

})