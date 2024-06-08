import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '123', from: 'PLN', to: 'USD' },
            { amount: '111', from: 'PLN', to: 'USD' },
            { amount: '999', from: 'PLN', to: 'USD' },
            { amount: '29', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'PLN', to: 'USD' },
            { amount: '1', from: 'PLN', to: 'USD' },
        ]
        for(const testObj of testCases){
            const amount = Number(testObj.amount).toFixed(2); //czemu to nie zalatwia sprawy i w render musze znowu uzyc Number(amount)
            
            render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(amount)} />);
            const output = screen.getByTestId('output');
            const result = (testObj.amount/3.5).toFixed(2);
            expect(output).toHaveTextContent(`${testObj.from} ${amount} = $${result}`);

            cleanup();
        }});
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '123', from: 'USD', to: 'PLN' },
            { amount: '111', from: 'USD', to: 'PLN' },
            { amount: '999', from: 'USD', to: 'PLN' },
            { amount: '29', from: 'USD', to: 'PLN' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '1', from: 'USD', to: 'PLN' },
        ]
        for(const testObj of testCases){
            const amount = Number(testObj.amount).toFixed(2); 
            
            render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(amount)} />);
            const output = screen.getByTestId('output');
            const result = (testObj.amount*3.5).toFixed(2);
            const formattedResult = Number(result).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            expect(output).toHaveTextContent(`$${amount} = ${testObj.to} ${formattedResult}`);

            cleanup();
        }});
    it('should render proper info about conversion when PLN = PLN', () => {
        const testCases = [
            { amount: '100', from: 'PLN', to: 'PLN' },
            { amount: '123', from: 'PLN', to: 'PLN' },
            { amount: '111', from: 'PLN', to: 'PLN' },
            { amount: '999', from: 'PLN', to: 'PLN' },
            { amount: '29', from: 'PLN', to: 'PLN' },
            { amount: '20', from: 'PLN', to: 'PLN' },
            { amount: '1', from: 'PLN', to: 'PLN' },
        ]
        for(const testObj of testCases){
            const amount = Number(testObj.amount).toFixed(2); 
            
            render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(amount)} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`${testObj.from} ${amount} = ${testObj.to} ${amount}`);

            cleanup();
        }});
        it('should render proper info about conversion when USD = USD', () => {
            const testCases = [
                { amount: '100', from: 'USD', to: 'USD' },
                { amount: '123', from: 'USD', to: 'USD' },
                { amount: '111', from: 'USD', to: 'USD' },
                { amount: '999', from: 'USD', to: 'USD' },
                { amount: '29', from: 'USD', to: 'USD' },
                { amount: '20', from: 'USD', to: 'USD' },
                { amount: '1', from: 'USD', to: 'USD' },
            ]
            for(const testObj of testCases){
                const amount = Number(testObj.amount).toFixed(2); 
                
                render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(amount)} />);
                const output = screen.getByTestId('output');
                expect(output).toHaveTextContent(`$${amount} = $${amount}`);
    
                cleanup();
            }});
            it('should render proper info about conversion when amount < 0', () => {
                const testCases = [
                    { amount: '-100', from: 'PLN', to: 'USD' },
                    { amount: '-123', from: 'PLN', to: 'USD' },
                    { amount: '-111', from: 'PLN', to: 'USD' },
                    { amount: '-999', from: 'PLN', to: 'USD' },
                    { amount: '-29', from: 'PLN', to: 'USD' },
                    { amount: '-20', from: 'PLN', to: 'USD' },
                    { amount: '-1', from: 'PLN', to: 'USD' },
                ]
                for(const testObj of testCases){
                    const amount = Number(testObj.amount).toFixed(2); 
                    
                    render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(amount)} />);
                    const output = screen.getByTestId('negativeOutput');
                    expect(output).toHaveTextContent('Wrong value...');
        
                    cleanup();
                }});
});