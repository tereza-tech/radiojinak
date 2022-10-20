import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import blog from 'react-bricks-ui/blog'
import HeroUnit from './MyHeroUnit'
import Thumbnail from './Thumbnail'
import Customers from './Customers'
import Team from './Team'
import TeamMember from './TeamMember'


const bricks: types.Brick<any>[] = [
  ...website, // React Bricks UI
  ...blog,
  HeroUnit, 
  Thumbnail,
  Customers,
  Team,
  TeamMember// Example custom brick
  // Put here your other bricks...
]

export default bricks
