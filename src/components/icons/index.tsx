import {
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react'
import {
  PlusIcon,
  PencilIcon,
  CopyIcon,
  TrashIcon,
  ForwardIcon,
  type LucideProps,
} from 'lucide-react'

type SemanticIcon = ForwardRefExoticComponent<
  LucideProps & RefAttributes<SVGSVGElement>
>

const CreateIcon: SemanticIcon = forwardRef((props, ref) => (
  <PlusIcon {...props} ref={ref} />
))

const UpdateIcon: SemanticIcon = forwardRef((props, ref) => (
  <PencilIcon {...props} ref={ref} />
))

const CopyToClipboardIcon: SemanticIcon = forwardRef((props, ref) => (
  <CopyIcon {...props} ref={ref} />
))

const DeleteIcon: SemanticIcon = forwardRef((props, ref) => (
  <TrashIcon {...props} ref={ref} />
))

const OpenDetailIcon: SemanticIcon = forwardRef((props, ref) => (
  <ForwardIcon {...props} ref={ref} />
))

export {
  CreateIcon,
  UpdateIcon,
  CopyToClipboardIcon,
  DeleteIcon,
  OpenDetailIcon,
}
