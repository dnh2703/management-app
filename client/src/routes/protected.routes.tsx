import { RxDashboard } from 'react-icons/rx'
import { BiTask } from 'react-icons/bi'
import { HiUsers } from 'react-icons/hi2'
import { FaUserTie } from 'react-icons/fa6'
import { PiBuildingsBold } from 'react-icons/pi'
import LoadingPage from '~/components/LoadingPage'
import { Customer, Dashboard, Department, Project, Employee } from '~/pages'
import { ProjectEdit, ProjectForm, ProjectTable } from '~/modules/Project'
import { CustomerEdit, CustomerForm, CustomerTable } from '~/modules/Customer'
import { EmployeeEdit, EmployeeForm, EmployeeTable } from '~/modules/Employee'
import { DepartmentEdit, DepartmentForm, DepartmentTable } from '~/modules/Department'
import { Suspense, lazy } from 'react'
const MainLayout = lazy(() => import('../layouts/MainLayout'))

const protectedRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingPage />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        displayText: 'Dashboard',
        element: <Dashboard />,
        icon: <RxDashboard />
      },
      {
        path: 'projects',
        displayText: 'Project',
        element: <Project />,
        icon: <BiTask />,
        children: [
          {
            path: '',
            element: <ProjectTable />
          },
          {
            path: 'add',
            element: <ProjectForm />
          },
          {
            path: ':projectId',
            element: <ProjectEdit />
          }
        ]
      },
      {
        path: 'customers',
        displayText: 'Customer',
        element: <Customer />,
        icon: <FaUserTie />,
        children: [
          {
            path: '',
            element: <CustomerTable />
          },
          {
            path: 'add',
            element: <CustomerForm />
          },
          {
            path: ':customerId',
            element: <CustomerEdit />
          }
        ]
      },
      {
        path: 'departments',
        displayText: 'Department',
        element: <Department />,
        icon: <PiBuildingsBold />,
        children: [
          {
            path: '',
            element: <DepartmentTable />
          },
          {
            path: 'add',
            element: <DepartmentForm />
          },
          {
            path: ':departmentId',
            element: <DepartmentEdit />
          }
        ]
      },
      {
        path: 'employees',
        displayText: 'Employee',
        element: <Employee />,
        icon: <HiUsers />,
        children: [
          {
            path: '',
            element: <EmployeeTable />
          },
          {
            path: 'add',
            element: <EmployeeForm />
          },
          {
            path: ':employeeId',
            element: <EmployeeEdit />
          }
        ]
      }
    ]
  }
]

export default protectedRoutes
