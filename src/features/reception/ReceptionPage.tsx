// import { ActionGuard } from '@/components/action-guard/ActionGuard'
// import { CreateIconButton } from '@/components/icon-buttons'

// import { useState } from 'react'

import { SampleTable } from '@/features/room/components/SampleTable'

const ReceptionPage = () => {
  // const [count, setCount] = useState(0)

  // const handleCreate = () => {
  //   setCount(count + 1)
  // }

  return (
    <div>
      {/* <ActionGuard
        onAction={handleCreate}
        shouldConfirm={count % 2 === 0}
        title="Test"
        description="test"
        renderTrigger={(handleTrigger) => (
          <CreateIconButton onClick={handleTrigger} />
        )}
      /> */}

      <SampleTable />
    </div>
  )
}

export { ReceptionPage as Component }
