import { menus } from '../menus'
import { MenuCard } from './MenuCard'

export const MenuGrid = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            to={`/${menu.to}`}
            title={menu.title}
            description={menu.description}
            icon={menu.icon}
          />
        ))}
      </div>
    </div>
  )
}
