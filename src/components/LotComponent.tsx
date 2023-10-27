import React from "react"
import LotService from "../services/LotService";
import { Lot } from "../models";
  
interface LotComponentState {
    lots: Lot[];
}

class LotComponent extends React.Component<{}, LotComponentState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            lots: [],
        };
    }

    async componentDidMount(): Promise<void> {

        LotService.getActiveLots().then((responce) => {
            this.setState({ lots : responce.data});
        } )
    }
  
    render() {
        return (
        <div>
            <h1>Active Lots</h1>
            <table>
                <thead>
                    <tr>
                        <td> Lot id </td>
                        <td> Name </td>
                        <td> Author </td>
                        <td> Category </td>
                        <td> Descroption </td>
                        <td> Expiration Date </td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.lots.map(
                        lot => 
                        <tr key={lot.id_lot}>
                            <td> {lot.id_lot} </td>
                            <td> {lot.name_of_lot} </td>
                            <td> {lot.authorEmail} </td>
                            <td> {lot.category} </td>
                            <td> {lot.description} </td>
                            <td> {lot.expiration} </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
        );
    }
}

export default LotComponent;