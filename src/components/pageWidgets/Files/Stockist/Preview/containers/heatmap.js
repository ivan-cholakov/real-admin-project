import { connect } from 'react-redux';
import Heatmap from '../../../../Heatmap';

const actions = [
    {location: {latitude: 55.51, longitude: 65.24}, id:'320o4as'},
    {location: {latitude: 56.51, longitude: 66.24}, id:'320o4bs'},
    {location: {latitude: 57.51, longitude: 67.24}, id:'320o4cs'},
    {location: {latitude: 58.51, longitude: 68.24}, id:'320o4ds'},
    {location: {latitude: 59.51, longitude: 69.24}, id:'320o4es'},
    {location: {latitude: 60.51, longitude: 80.24}, id:'320o4fs'},
];

const mapStateToProps = () => ({
    actions
});



export default connect(mapStateToProps, null)(Heatmap);
