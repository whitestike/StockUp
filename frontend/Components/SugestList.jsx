import { Pressable, Text, View} from "react-native";

export default function SugestList(props){
    const data = Object.values( props.data );

    return (
        <View style={{ zIndex: 10, top: 73, backgroundColor: 'white', position: 'absolute', borderRightWidth: 1, borderLeftWidth: 1, borderColor: 'black', width: 200, alignItems: 'center'}}>
            {data.map(item => {
                return(
                    <Pressable style={{ borderBottomWidth: 1, borderBottomColor: 'black', width: 200, height: 30, justifyContent: 'center', alignItems: 'center'}} key={item.id} onPress={() => {
                        props.onPress(item.name);
                    }}><Text style={{textAlign: 'center'}}>{item.name}</Text></Pressable>
                );
            })}
        </View>
    );

}