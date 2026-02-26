import { IconButton, type IconButtonProps } from './IconButton'
import {
  CreateIcon,
  UpdateIcon,
  CopyToClipboardIcon,
  DeleteIcon,
  OpenDetailIcon,
} from '@/components/icons'

type SemanticIconButtonProps = Omit<IconButtonProps, 'icon'>

const CreateIconButton = (props: SemanticIconButtonProps) => {
  return <IconButton icon={CreateIcon} {...props} />
}

const UpdateIconButton = (props: SemanticIconButtonProps) => {
  return <IconButton icon={UpdateIcon} {...props} />
}

const CopyToClipboardIconButton = (props: SemanticIconButtonProps) => {
  return <IconButton icon={CopyToClipboardIcon} {...props} />
}

const DeleteIconButton = (props: SemanticIconButtonProps) => {
  return <IconButton icon={DeleteIcon} {...props} />
}

const OpenDetailIconButton = (props: SemanticIconButtonProps) => {
  return <IconButton icon={OpenDetailIcon} {...props} />
}

export {
  CreateIconButton,
  UpdateIconButton,
  CopyToClipboardIconButton,
  DeleteIconButton,
  OpenDetailIconButton,
  type SemanticIconButtonProps,
}
