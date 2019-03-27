import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../config/colors'

type Props = TextInputProps;

class FormTextnput extends React.Component<Props> {
    render(){
        const { style, ...otherProps } = this.props
        return <TextInput
                selectionColor={colors.DODGER_BLUE}
                style={{styles.TextInput, style}}
                {...otherProps}
                /> ;
    }

}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
});