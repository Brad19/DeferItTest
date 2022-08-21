import React from "react"
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import BillList from "@screens/BillList";
import axios from 'axios';
import { MenuProvider } from "react-native-popup-menu";


const response = {
    data : [
        {
            id: 1,
            amount: 20,
            status: 'processing',
            date: '1995-01-22T04:19:58.299Z'
        },
        {
            amount: 16,
            date: '2023-01-14T23:19:19.962Z',
            status: 'scheduled',
            id: 2
        },
        {
            amount: 68,
            date: '2022-02-16T14:33:10.693Z',
            status: 'paid',
            id: 3
        },
        {
            amount: 75,
            date: '2022-03-11T18:14:50.856Z',
            status: 'unable to pay',
            id: 4
        },
    ]
} 

jest.mock('axios');

describe('BillList ', () => {

    it('verify total counts for bill list', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
        const { getByLabelText, getAllByText, getByText, getByTestId, queryByTestId } = render(<MenuProvider><BillList /></MenuProvider>)
        
            await waitFor(() => {
                expect(getByLabelText('billList')).toBeTruthy();
                expect(getAllByText('Date:')).toHaveLength(4);
                expect(getAllByText('Amount:')).toHaveLength(4);
                expect(getAllByText('Status:')).toHaveLength(4);
            });
    });

    it('verify bill list when the bill status is processing', async() => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
        const { getByText,  getByTestId, queryByLabelText } = render(<MenuProvider><BillList /></MenuProvider>)
            await waitFor(() => {
                expect(getByText('$20.00')).toBeTruthy();
                expect(getByText('Sun Jan 22 1995')).toBeTruthy();
                expect(getByText('processing')).toBeTruthy();
                expect(queryByLabelText('processingIcon')).toBeTruthy();
                expect(getByTestId('processingMenuTrigger')).toBeTruthy();
                fireEvent.press(getByTestId('processingMenuTrigger'));
            });   
            
    })

    it('verify bill list when the bill status is scheduled', async() => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
        const { queryByLabelText, getByText, getByTestId } = render(<MenuProvider><BillList /></MenuProvider>)
        
            await waitFor(() => {
                expect(getByText('$16.00')).toBeTruthy();
                expect(getByText('Sun Jan 15 2023')).toBeTruthy();
                expect(getByText('scheduled')).toBeTruthy();
                expect(queryByLabelText('scheduledIcon')).toBeTruthy();
                expect(getByTestId('scheduledMenuTrigger')).toBeTruthy();
            });
    })

    it('verify bill list when the bill status is paid', async() => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
        const { queryByLabelText, getByText} = render(<MenuProvider><BillList /></MenuProvider>)
        
        await waitFor(() => {
            expect(getByText('$68.00')).toBeTruthy();
            expect(getByText('Thu Feb 17 2022')).toBeTruthy();
            expect(getByText('paid')).toBeTruthy();
            expect(queryByLabelText('paidIcon')).toBeNull();
        });
    })

    it('verify bill list when the bill status is unable to pay', async() => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
        const { queryByLabelText, getAllByText, getByText, getByTestId, queryByTestId } = render(<MenuProvider><BillList /></MenuProvider>)
        
        await waitFor(() => {
            expect(getByText('$75.00')).toBeTruthy();
            expect(getByText('Sat Mar 12 2022')).toBeTruthy();
            expect(getByText('unable to pay')).toBeTruthy();
            expect(queryByLabelText('unable to payIcon')).toBeNull();
        });
    })
});