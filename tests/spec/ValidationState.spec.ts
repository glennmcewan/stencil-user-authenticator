import { ValidationState } from "../../src/validation/ValidationState";

describe('ValidationState', () => {
    it('is valid if no errors', () => {
        const state = new ValidationState([]);

        expect(state.isValid()).toEqual(true);
    });

    it('is not valid if has errors', () => {
        const state = new ValidationState([
            {
                identifier: 'message_1',
                message: 'Error 1'
            }
        ]);

        expect(state.isValid()).toEqual(false);
    });

    it('returns errors', () => {
        const state = new ValidationState([
            {
                identifier: 'message_1',
                message: 'Error 1'
            }
        ]);

        expect(state.getErrors().length).toEqual(1);
    });

    it('returns errors filtered by identifier', () => {
        const state = new ValidationState([
            {
                identifier: 'message_1',
                message: 'Error 1'
            },
            {
                identifier: 'message_2',
                message: 'Error 2'
            },
        ]);

        expect(state.getErrorsFor('message_2')).toEqual([
            {
                identifier: 'message_2',
                message: 'Error 2'
            }
        ]);
    });
});
