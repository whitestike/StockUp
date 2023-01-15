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
    button2: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: 120,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#4BC188',
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        width: '100%',
        justifyContent: 'flex-start'
    },
    headerText: {
        fontSize: 22,
        color: '#0F2D2A',
        textAlign: 'center',
        fontFamily: 'Poppins_light'
    },
    productCard: {
        width: '90%',
        height: 90,
        borderColor: '#4BC188',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 5,
        position: 'relative'
    },
    textDark: {
        fontSize: 15,
        paddingHorizontal: 10,
        fontFamily: 'Poppins_light',
        color: '#0F2D2A'
    },
    textDarkBig: {
        fontSize: 18,
        paddingHorizontal: 10,
        fontFamily: 'Poppins_light',
        color: '#0F2D2A'
    },
    textSecondaryLight: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#204E4A',
        fontFamily: 'Poppins_light'
    },
    removeButton: {
        backgroundColor: '#0F2D2A',
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 7,
        position: 'absolute', 
        right: 3, 
        bottom: 3
    },
    textLight: {
        color: 'white',
        fontFamily: 'Poppins_light',
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 12
    },
    numberInput: {
        textAlign: 'center',
        padding: 5,
        fontSize: 16
    },
    title: {
        fontSize: 30,
        marginRight: '45%',
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Poppins_light',
        backgroundColor: 'white',
        color: '#0F2D2A'
    },
    title2: {
        fontSize: 24,
        marginRight: '45%',
        paddingHorizontal: 5,
        textAlign: 'center',
        paddingTop: 25,
        paddingBottom: 15,
        fontFamily: 'Poppins_light',
        backgroundColor: 'white',
        color: '#0F2D2A'
    },
    line: {
        borderBottomWidth: 1,
        height: 0,
        width: '95%',
        position: 'absolute',
        top: '50%',
        zIndex: -1,
        color: '#0F2D2A'
    },
    titleContainer: {
        position: 'relative',
        alignItems: 'center'
    },
    containerProductText: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    textLabel: {
        fontFamily: 'Poppins_bold',
        fontSize: 16
    },
    textLabel2: {
        fontFamily: 'Poppins_bold',
        fontSize: 20,
        color: '#0F2D2A',
        borderBottomWidth: 1,
        borderBottomColor: '#0F2D2A'
    },
    basicModal: {
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 10,
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        elevation: 20,
        shadowOffset: {width: -2, height: 4},
        shadowColor: 'black',
        alignItems: 'center',
    },
    slide: {
        height: '100%'
    },
    slideTitle: {
        fontSize: 30,
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Poppins_light',
        color: 'white'
    },
    slideText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins_light',
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 18
    },
    homeScreenButton: {
        width: '50%',
        backgroundColor: '#204E4A',
        alignitems: 'center',
        paddingVertical: 10,
    }
});

export default styles;