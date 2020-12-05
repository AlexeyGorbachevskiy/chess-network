import React, {ChangeEvent} from 'react'
import style from './ProfileStatus.module.css'


type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, any> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateActiveMode = () => {
        this.setState({...this.state, editMode: true})
    }

    deactivateActiveMode = () => {
        this.setState({...this.state, editMode: false});
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, status: e.currentTarget.value})
    }

    render() {
        return (
            <>
                Status:
                {
                    this.state.editMode
                        ?
                        <input
                            onChange={this.onStatusChange}
                            autoFocus
                            onBlur={this.deactivateActiveMode}
                            className={style.input}
                            value={this.state.status}
                            type='text'/>
                        :
                        <p className={style.status_text}
                           onDoubleClick={this.activateActiveMode}
                        >{this.props.status ? this.props.status : ' No status'}
                        </p>
                }
            </>
        )
    }
}


export default ProfileStatus