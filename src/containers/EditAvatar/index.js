// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { fileUploadAvatar } from '../uploads/actions'
import UploadAvatar from '../../components/UploadAvatar'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  hasErrored: state.uploads.hasErrored.includes('avatar'),
  isLoading: state.uploads.isLoading.includes('avatar'),
  upload: state.uploads.uploaded.find(item => item.id === 'avatar'),
  userId: ownProps.match.params.userId,
  previewPath: state.producer.producer ? state.producer.producer.avatar : null,
})

const mapDispatchToProps = (dispatch: Function) => ({
  onUploadFile: (id: string, file: Object, keys: Object) => {
    dispatch(fileUploadAvatar(id, file, keys.userId))
  },
})

const EditAvatar = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadAvatar))

export default EditAvatar
