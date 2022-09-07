import { Link, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Image, { StaticImageData } from 'next/image'

import contact from '/public/icons/contact-icon.png'
import home from '/public/icons/home-icon.png'
import language from '/public/icons/language-icon.png'

import useStyles from './styles'

export type Icons = {
  home: StaticImageData
  contact: StaticImageData
  language: StaticImageData
}

const icons: Icons = {
  home,
  contact,
  language
}

type CustomListItemProps = {
  label: string
  href?: string
  target?: string
  iconName: keyof Icons
  isSelected: boolean
  onClick?(): void
}

const CustomListItem: React.FC<CustomListItemProps> = ({
  label,
  href,
  target,
  iconName,
  isSelected,
  onClick
}) => {
  const classes = useStyles()

  return (
    <Link
      onClick={onClick}
      href={href}
      target={target}
      className={classes.linkStyle}
    >
      <ListItem
        classes={{
          root: classes.rootListItem,
          selected: classes.selectedListItem
        }}
        className={classes.genericListItem}
        selected={isSelected}
      >
        <ListItemIcon
          classes={{
            root: classes.rootListItemIcon
          }}
          className={classes.genericListItemIconStyle}
        >
          <Image src={icons?.[iconName]} alt={label} placeholder='blur' />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.primaryListItemText
          }}
          primary={label}
        />
      </ListItem>
    </Link>
  )
}

export default CustomListItem
