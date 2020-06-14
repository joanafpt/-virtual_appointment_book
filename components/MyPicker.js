import React, { useState, useEffect } from 'react';
import { View, Picker, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Buttons from '../constants/Buttons';

const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047",
    "2048", "2049", "2050", "2051", "2052", "2053", "2054", "2055", "2056", "2057", "2058", "2059", "2060", "2061", "2062", "2063", "2064", "2065", "2066", "2067", "2068", "2069", "2070", "2071", "2072", "2073", "2074", "2075", "2076", "2077",
    "2078", "2079", "2080", "2081", "2082", "2083", "2084", "2085", "2086", "2087", "2088", "2089", "2090", "2091", "2092", "2093", "2094", "2095", "2096", "2097", "2098", "2099", "2100", "2101", "2102", "2103", "2104", "2105", "2106", "2107",
    "2108", "2109", "2110", "2111", "2112", "2113", "2114", "2115", "2116", "2117", "2118", "2119", "2120", "2121", "2122", "2123", "2124", "2125", "2126", "2127", "2128", "2129", "2130", "2131", "2132", "2133", "2134", "2135",
    "2136", "2137", "2138", "2139", "2140", "2141", "2142", "2143", "2144", "2145", "2146", "2147", "2148", "2149", "2150", "2151", "2152", "2153", "2154", "2155", "2156", "2157", "2158", "2159", "2160", "2161", "2162", "2163", "2164", "2165", "2166", "2167", "2168", "2169", "2170", "2171", "2172", "2173", "2174", "2175", "2176",
    "2177", "2178", "2179", "2180", "2181", "2182", "2183", "2184", "2185", "2186", "2187", "2188", "2189", "2190", "2191", "2192", "2193", "2194", "2195", "2196", "2197", "2198", "2199", "2200", "2201", "2202", "2203", "2204", "2205",
    "2206", "2207", "2208", "2209", "2210", "2211", "2212", "2213", "2214", "2215", "2216", "2217", "2218", "2219", "2220", "2221", "2222", "2223", "2224", "2225", "2226", "2227", "2228", "2229", "2230", "2231", "2232", "2233", "2234", "2235", "2236", "2237", "2238", "2239", "2240", "2241", "2242", "2243", "2244", "2245", "2246", "2247", "2248", "2249", "2250", "2251", "2252", "2253", "2254", "2255", "2256", "2257", "2258", "2259", "2260", "2261", "2262", "2263", "2264", "2265", "2266", "2267", "2268", "2269", "2270", "2271", "2272", "2273", "2274", "2275", "2276", "2277", "2278", "2279", "2280", "2281", "2282", "2283", "2284", "2285", "2286", "2287", "2288", "2289", "2290", "2291", "2292", "2293", "2294", "2295", "2296", "2297", "2298", "2299", "2300"
];

const MyPicker = (props) => {
    const [selectedDay, setSelectedDay] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [dataIsObtained, setDataIsObtained] = useState(false);

    var getToday = () => {
        var hoje = new Date().toString();
        var dia = hoje.substr(8, 2);
        var mes = hoje.substr(4, 3);
        var ano = hoje.substr(11, 4);

        if (mes === 'Jan') { mes = '01'; }
        if (mes === 'Feb') { mes = '02'; }
        if (mes === 'Mar') { mes = '03'; }
        if (mes === 'Apr') { mes = '04'; }
        if (mes === 'May') { mes = '05'; }
        if (mes === 'Jun') { mes = '06'; }
        if (mes === 'Jul') { mes = '07'; }
        if (mes === 'Aug') { mes = '08'; }
        if (mes === 'Sep') { mes = '09'; }
        if (mes === 'Oct') { mes = '10'; }
        if (mes === 'Nov') { mes = '11'; }
        if (mes === 'Dec') { mes = '12'; }

        hoje = [dia, mes, ano];
        console.log(hoje, ' dentro do picker');//OK

        setSelectedDay(hoje[0])
        setSelectedMonth(hoje[1])
        setSelectedYear(hoje[2])
        setDataIsObtained(true);
        return hoje;
    }

    useEffect(() => {
        getToday();
    }, []); // I shall say this only once :)

    const getMyDatePlease = (myDay, myMonth, myYear) => {
        myDay = selectedDay;
        myMonth = selectedMonth;
        myYear = selectedYear;
        props.parentCallback(myDay, myMonth, myYear);
    }

    return (
        <View style={styles.outerCont}>
            <View style={styles.container}>
                <Picker
                    style={styles.dayAndMonthPicker}
                    mode="dropdown"
                    selectedValue={selectedDay}
                    onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}>
                    {days.map((element) => {
                        return (<Picker.Item label={element} value={element} key={element} />)
                    })}
                </Picker>
                <Picker
                    style={styles.dayAndMonthPicker}
                    mode="dropdown"
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}>
                    {months.map((element) => {
                        return (<Picker.Item label={element} value={element} key={element} />)
                    })}
                </Picker>
                <Picker
                    style={styles.yearPicker}
                    mode="dropdown"
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}>
                    {
                        years.map((element) => {
                            return (
                                <Picker.Item label={element} value={element} key={element}
                                />)
                        })
                    }
                </Picker>
            </View>

            <View style={styles.selectDateView}>
                <TouchableOpacity
                    style={styles.pickerbutton}
                    onPress={getMyDatePlease}>
                    <Text style={Buttons.buttonText}>Selecionar data</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    outerCont: {
        backgroundColor: 'white', //era white
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: Platform.OS === 'android' ? 'center' : null,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: Platform.OS === 'android' ? 25 : null, //alterado
        marginBottom: Platform.OS === 'android' ? 0 : null //ALTERADO
    },
    dayAndMonthPicker: {
        height: Platform.OS === 'android' ? 50 : 29, //ALTERADO
        width: 50,
        // height: 29,
        marginBottom: 100,
        marginRight: 10
    },
    yearPicker: {
        width: 100,
        height: Platform.OS === 'android' ? 50 : 29, //ALTERADO
        marginBottom: 100,
        marginRight: 10
    },
    pickerbutton: {
        //marginRight: 5,
        width: 230,
        backgroundColor: 'tomato',
        height: 28,
        //borderRadius: 20,
        alignItems: "center",
        padding: 5
    },
    selectDateView: {
        marginTop: Platform.OS === 'android' ? 20 : 60, //ios é 60
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 28,
        // backgroundColor:'lime'
    },
})

export default MyPicker;
