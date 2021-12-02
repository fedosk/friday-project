import React, {useState} from 'react'
import SuperInputText from "../../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../main/ui/common/c2-SuperButton/SuperButton";

type PropsType = {
    arr: []
}

export const Search = (props:PropsType) => {
    const [word, setWord] = useState<string>('')

    const searchWord = () => {
        const copyArray = [...props.arr]
        //const result = copyArray.map(item => {item.name == word})
       // return result
    }

    return(
        <div>
            <SuperInputText
            formName={'search'}
            type={'text'}
            onChangeText={setWord}
            style={{width:'150px'}}
            />
            <SuperButton
            onClick={searchWord}
            >
                Search
            </SuperButton>
        </div>
    )
}