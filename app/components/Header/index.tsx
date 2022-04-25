import { Link, NavLink, useLoaderData } from 'remix';
import { LayoutQueries } from '~/routes/__layout';
import CartButton from '../Cart/CartButton';
import UspBar from './UspBar';

function Header() {
  const { navTree } = useLoaderData<LayoutQueries>();
  return (
    <>
      <header className='sticky top-0 z-10'>
        <UspBar />
        <div className='h-12 bg-blue-50 flex items-center px-2 shadow-md'>
          <Link to='/' prefetch='intent'>
            <img
              alt='logo'
              src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMxIiBoZWlnaHQ9IjI2IiB2aWV3Qm94PSIwIDAgMTMxIDI2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMjMuMTU5IDIyLjc3NzhWOC4yNjc2OEgxOFY0SDMzLjQ3NjlWOC4yNjc2OEgyOC4zMThWMjIuNzc3OEgyMy4xNTlaIiBmaWxsPSIjMjIyMjIyIi8+CjxwYXRoIGQ9Ik0zNy4wNjQgMjIuNzc3OFY0SDQ0LjM5ODlDNDUuNDUxOCA0IDQ2LjQ1NzggNC4wOTQ4NCA0Ny40MTcxIDQuMjg0NTFDNDguMzc2MyA0LjQ3NDE5IDQ5LjIwNjkgNC44MDYxMiA0OS45MDg4IDUuMjgwM0M1MC42MzQxIDUuNzU0NDkgNTEuMjA3MyA2LjM4Mjc5IDUxLjYyODUgNy4xNjUxOUM1Mi4wNDk2IDcuOTQ3NiA1Mi4yNjAyIDguOTMxNTQgNTIuMjYwMiAxMC4xMTdDNTIuMjYwMiAxMS4zOTczIDUxLjk1NiAxMi40ODc5IDUxLjM0NzcgMTMuMzg4OUM1MC43NjI4IDE0LjI4OTggNDkuOTc5IDE1LjAwMTEgNDguOTk2NCAxNS41MjI3TDUzLjMxMyAyMi43Nzc4SDQ3Ljg3MzNMNDQuMzk4OSAxNi41NTQxSDQyLjIyM1YyMi43Nzc4SDM3LjA2NFpNNDIuMjIzIDEyLjk5NzdINDQuMTE4MUM0NS4xOTQ0IDEyLjk5NzcgNDYuMDAxNiAxMi43NzI0IDQ2LjUzOTcgMTIuMzIyQzQ3LjEwMTIgMTEuODQ3OCA0Ny4zODIgMTEuMjE5NSA0Ny4zODIgMTAuNDM3MUM0Ny4zODIgOS41ODM1NCA0Ny4wODk1IDguOTc4OTYgNDYuNTA0NiA4LjYyMzMyQzQ1LjkxOTcgOC4yNjc2OCA0NS4xMDA4IDguMDg5ODYgNDQuMDQ4IDguMDg5ODZINDIuMjIzVjEyLjk5NzdaIiBmaWxsPSIjMjIyMjIyIi8+CjxwYXRoIGQ9Ik01Ni43MzY1IDIyLjc3NzhWNEg2OS4zMzU2VjguMDU0MjlINjEuODk1NFYxMS4zMjYySDY4LjI4MjdWMTUuMTMxNUg2MS44OTU0VjE4LjcyMzVINjkuNjg2NlYyMi43Nzc4SDU2LjczNjVaIiBmaWxsPSIjMjIyMjIyIi8+CjxwYXRoIGQ9Ik03NC4yNDk3IDIyLjc3NzhWNEg3OS40NDM4TDgzLjgzMDcgMTIuMTc5N0w4NS44NjYyIDE2LjY2MDhIODYuMDA2NkM4NS45MzY0IDE2LjE2MjkgODUuODY2MiAxNS42MDU3IDg1Ljc5NiAxNC45ODkzQzg1LjcyNTggMTQuMzQ5MSA4NS42NTU2IDEzLjY5NzEgODUuNTg1NCAxMy4wMzMyQzg1LjUzODYgMTIuMzY5NCA4NS40OTE5IDExLjcwNTUgODUuNDQ1MSAxMS4wNDE3Qzg1LjM5ODMgMTAuMzc3OCA4NS4zNzQ5IDkuNzQ5NTEgODUuMzc0OSA5LjE1Njc4VjRIOTAuMTEyN1YyMi43Nzc4SDg1LjA1OUw4MC40OTY3IDE0LjU2MjVMNzguNDk2MiAxMC4xMTdINzguMzU1OUM3OC40NzI4IDExLjIwNzYgNzguNjAxNSAxMi40NDA1IDc4Ljc0MTkgMTMuODE1N0M3OC45MDU3IDE1LjE2NzEgNzguOTg3NiAxNi40MzU1IDc4Ljk4NzYgMTcuNjIxVjIyLjc3NzhINzQuMjQ5N1oiIGZpbGw9IiMyMjIyMjIiLz4KPHBhdGggZD0iTTk1LjUzMyAyMi43Nzc4VjRIMTAxLjMyNEMxMDIuNzk4IDQgMTA0LjE1NSA0LjE2NTk3IDEwNS4zOTUgNC40OTc5QzEwNi42NTggNC44Mjk4MyAxMDcuNzQ2IDUuMzYzMjkgMTA4LjY1OSA2LjA5ODI3QzEwOS41NzEgNi44MzMyNiAxMTAuMjg1IDcuNzkzNDkgMTEwLjc5OSA4Ljk3ODk2QzExMS4zMTQgMTAuMTQwNyAxMTEuNTcxIDExLjU3NTEgMTExLjU3MSAxMy4yODIyQzExMS41NzEgMTQuOTg5MyAxMTEuMzE0IDE2LjQ0NzQgMTEwLjc5OSAxNy42NTY2QzExMC4zMDggMTguODQyIDEwOS42MTggMTkuODI2IDEwOC43MjkgMjAuNjA4NEMxMDcuODQgMjEuMzY3MSAxMDYuNzg3IDIxLjkyNDIgMTA1LjU3IDIyLjI3OTlDMTA0LjM3NyAyMi42MTE4IDEwMy4wNzggMjIuNzc3OCAxMDEuNjc1IDIyLjc3NzhIOTUuNTMzWk0xMDAuNjkyIDE4LjcyMzVIMTAxLjY0QzEwMy4xMTQgMTguNzIzNSAxMDQuMjQ4IDE4LjMwODYgMTA1LjA0NCAxNy40Nzg3QzEwNS44NjMgMTYuNjI1MiAxMDYuMjcyIDE1LjIyNjQgMTA2LjI3MiAxMy4yODIyQzEwNi4yNzIgMTEuMzg1NSAxMDUuODYzIDEwLjA0NTkgMTA1LjA0NCA5LjI2MzQ3QzEwNC4yMjUgOC40NTczNSAxMDMuMDkgOC4wNTQyOSAxMDEuNjQgOC4wNTQyOUgxMDAuNjkyVjE4LjcyMzVaIiBmaWxsPSIjMjIyMjIyIi8+Cjwvc3ZnPgo='
            />
          </Link>

          <nav className='px-4'>
            <ul className='flex gap-4'>
              {navTree?.map((category) => {
                if (!category?.primaryRoute) return null;

                return (
                  <li key={category.id} className='hover:text-blue-400'>
                    <NavLink
                      to={category?.primaryRoute.path}
                      prefetch='intent'
                      className={({ isActive }) =>
                        isActive ? 'font-bold' : ''
                      }
                    >
                      {category.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='ml-auto mr-8 flex items-center'>
            <CartButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
