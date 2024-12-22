import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#4ECDC4',
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        width: '100%'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF'
    },

})

export default styles;