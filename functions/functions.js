import axios from 'axios';
import axiosRetry from 'axios-retry';

const commonUrl = 'https://agenda2020.glitch.me/';
const commonPath = 'api/agenda/';
const todos = 'todos/';
const bySingleDate = 'os-meus-compromissos/?date=';
const submitComp = 'novo';
const sendTime = 'time';
const partialByDate = 'compromissos-por-data/?dates='

const getCompleteDataFromApi = (callback) => {
    axiosRetry(axios, { retries: 5 });
    axios.get(commonUrl + commonPath + todos)
        .then(response => {
            console.log(response.data);
            if (callback) {
                callback(response.data);
            }
        })
        .catch(error => {
            console.log(error, 'error');
        })
}

const searchCompromissoByDate = (dateToSearch, callback) => {
    axiosRetry(axios, { retries: 5 });
    axios.get(commonUrl + commonPath + bySingleDate + dateToSearch)
        .then(response => {
            console.log(response.data, ' response.data dentro da api call');
            if (callback) { //send data
                callback(response.data);
            }
        })
        .catch(error => { console.log(error) });
}

const submitCompromisso = (obj, callback) => {
    axiosRetry(axios, { retries: 5 });
    axios.post(commonUrl + commonPath + submitComp, obj)
        .then(response => {
            console.log(response.data, ' response.data dentro das funcoes');
            if (callback) {
                callback(response.data);
            }
        })
        .catch(error => {
            console.log(error);
            axios.post('https://agenda2020.glitch.me/api/agenda/novo', obj)
                .then(response => {
                    console.log(response.data);
                    if (callback) {
                        callback(response.data);
                    }
                })
        })
}

const sendOnlyHoursAndMinutes = (objTwo, callback) => {
    axiosRetry(axios, { retries: 10 });
    axios.post(commonUrl + commonPath + sendTime, objTwo)
        .then(response => {
            console.log(response.data, ' response.data ');
            if (callback) {
                callback(response.data);
            }
        })
        .catch(error => { console.log(error) })
}

const getByDates = (initDate, endDate, callback) => {
    axios.get(commonUrl + commonPath + partialByDate + initDate + endDate)
        .then(response => {
            if (callback) {
                callback(response.data);
            }
        }).catch(error => { console.log(error) })
}

const functionsToExport = {
    getCompleteDataFromApi: getCompleteDataFromApi,
    searchCompromissoByDate: searchCompromissoByDate,
    submitCompromisso: submitCompromisso,
    getByDates: getByDates,
    sendOnlyHoursAndMinutes: sendOnlyHoursAndMinutes // for test purposes only
}

export default functionsToExport;