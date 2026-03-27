import { View, Text, TouchableOpacity } from "react-native"

export default function QuantitySelector({qty,setQty}){

return(

<View style={{flexDirection:"row",alignItems:"center"}}>

<TouchableOpacity onPress={()=>setQty(qty-1)}>
<Text style={{fontSize:20}}>−</Text>
</TouchableOpacity>

<Text style={{marginHorizontal:10}}>
{qty}
</Text>

<TouchableOpacity onPress={()=>setQty(qty+1)}>
<Text style={{fontSize:20}}>+</Text>
</TouchableOpacity>

</View>

)

}