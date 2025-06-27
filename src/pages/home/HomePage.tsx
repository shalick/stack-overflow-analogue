import { useAuthStore } from '../../auth/useAuthStore';

const HomePage = () => {
  const { user} = useAuthStore();
  return (
    <div>{user?.username}</div>
  )
}

export default HomePage
