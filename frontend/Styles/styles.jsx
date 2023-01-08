import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        width: 400,
        overflow: 'hidden',
        borderRadius: 30,
    },
    input: {
        width: 200,
        margin: 12,
        borderBottomWidth: 1,
        padding: 7,
    },
    acountLink: {
        borderRadius: 20,
        backgroundColor: 'black'
    },
    header: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 22,
        color: '#0F2D2A',
        textAlign: 'center',
        fontFamily: 'Poppins_light'
    },
    productCard: {
        width: "47%",
        height: 75,
        borderColor: '#4BC188',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        position: 'relative'
    },
    textDark: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: '#0F2D2A'
    },
    removeButton: {
        backgroundColor: '#0F2D2A',
        borderRadius: 10,

    },
    textLight: {
        color: 'white',
        fontFamily: 'Poppins_light',
        padding: 5,
    }
});

export default styles;