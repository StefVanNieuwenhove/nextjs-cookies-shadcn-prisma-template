import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';

const HomePage = async () => {
  const { user, isAuth } = await getSession();

  return (
    <main className='container mx-auto'>
      <Button>Click me</Button>
      {isAuth && user && (
        <div>
          <p>id: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>email: {user.email}</p>
        </div>
      )}
      {!isAuth && <div>You are not logged in</div>}
    </main>
  );
};

export default HomePage;
