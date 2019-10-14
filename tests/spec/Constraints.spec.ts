import { Constraints } from "../../src/validation/Constraints";
import { ConstraintInterface } from "../../src/validation/ConstraintInterface";

describe('Constraints', () => {
    it('should validate a name', () => {
        const constraints = Constraints.getNameConstraints();
        const assertionsMap = [
            {
                value: 'Jeff',
                expectedErrorCount: 0
            },
            {
                value: '',
                expectedErrorCount: 1
            }
        ];

        assertionsMap.forEach(map => {
            const result: string[] = constraints.map((constraint: ConstraintInterface) => {
                return constraint(map.value);
            }).filter((message: string) => message !== null);

            expect(result).toHaveLength(map.expectedErrorCount);
        });
    });

    it('should validate a password', () => {
        const constraints = Constraints.getPasswordConstraints();
        const assertionsMap = [
            {
                value: 'Password1',
                expectedErrorCount: 0
            },
            {
                value: 'Password',
                expectedErrorCount: 1
            },
            {
                value: 'password',
                expectedErrorCount: 2
            },
            {
                value: '',
                expectedErrorCount: 3
            }
        ];

        assertionsMap.forEach(map => {
            const result: string[] = constraints.map((constraint: ConstraintInterface) => {
                return constraint(map.value);
            }).filter((message: string) => message !== null);

            expect(result).toHaveLength(map.expectedErrorCount);
        });
    });

    it('should validate an email', () => {
        const constraints = Constraints.getEmailConstraints();
        const assertionsMap = [
            {
                value: 'me@example.org',
                expectedErrorCount: 0
            },
            {
                value: 'example.org',
                expectedErrorCount: 1
            },
            {
                value: '',
                expectedErrorCount: 2
            }
        ];

        assertionsMap.forEach(map => {
            const result: string[] = constraints.map((constraint: ConstraintInterface) => {
                return constraint(map.value);
            }).filter((message: string) => message !== null);

            expect(result).toHaveLength(map.expectedErrorCount);
        });
    });
});
