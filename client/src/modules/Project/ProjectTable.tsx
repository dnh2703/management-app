import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MdAddCircleOutline } from 'react-icons/md'
import { Button, InputSearch, NotFoundTable, Pagination, ProjectStatus, Table, TableAction } from '~/components'
import SkeletonTable from '~/components/SkeletonTable'
import { PROJECT_FILED_HEADINGS } from '~/constants/thead.constants'
import { usePagination } from '~/hooks'
import { handleStringParam } from '~/libs/params.libs'
import { router } from '~/main'
import { useAppDispatch, useAppSelector } from '~/stores/hook'
import { deleteProjectAction, getAllProjectAction } from '~/stores/project/projectSlice'
import ProjectDropdownStatus from '~/components/ProjectDropdownStatus'

const ProjectTable = () => {
  const { isLoading, projects, totalPage, isDeleted } = useAppSelector((state) => state.project)

  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const { size, page } = usePagination()

  const q = searchParams.get('q')
  const status = searchParams.get('status')

  useEffect(() => {
    dispatch(
      getAllProjectAction({
        q: handleStringParam(q),
        page: `${page}`,
        size: `${size}`,
        status: handleStringParam(status)
      })
    )
  }, [dispatch, q, page, size, status, isDeleted])

  const renderTable = () => {
    if (isLoading) {
      return <SkeletonTable col={6} />
    }

    if (!projects.length) {
      return <NotFoundTable />
    }

    return projects.map((project, index) => {
      return (
        <tr key={index} className='border-t border-zinc-200 text-zinc-900 hover:bg-zinc-50 transition-colors'>
          <td className='px-4 py-2 text-sm whitespace-nowrap'>{`${project.project_id}`}</td>
          <td className='px-4 py-2 text-sm whitespace-nowrap'>{project.title}</td>
          <td className='px-4 py-2 text-sm whitespace-nowrap'>
            {project.tech_stacks.map((item) => item.name).join(', ')}
          </td>
          <td className='px-4 py-2 text-sm whitespace-nowrap'>
            <ProjectStatus current_status={project.status} />
          </td>
          <td className='px-4 py-2 text-sm whitespace-nowrap capitalize'>{project.priority}</td>
          <td className='px-4 py-2 text-sm whitespace-nowrap'>
            <TableAction
              handleDeleteEvent={() => {
                dispatch(deleteProjectAction({ id: project.project_id }))
              }}
              handleEditEvent={() => {
                router.navigate(`${location.pathname}/${project.project_id}`)
              }}
            />
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Project</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <div className='flex items-center justify-between flex-col min-[800px]:flex-row pt-6 pb-4 gap-3'>
          <InputSearch className='w-full min-[800px]:w-auto' placeholder='Filter task and title...' />
          <div className='flex items-center gap-2 w-full min-[800px]:w-auto'>
            <Button
              className='bg-black text-white font-semibold hover:opacity-80 transition-all w-full min-[800px]:w-auto'
              onClick={() => router.navigate(`${location.pathname}/add`)}
            >
              <MdAddCircleOutline className='text-white mr-2 text-lg' />
              Add project
            </Button>
            <ProjectDropdownStatus className='w-full min-[800px]:w-auto' />
          </div>
        </div>
        <div className='relative overflow-x-auto border border-zinc-200 rounded-lg mb-4'>
          <Table>
            <thead>
              <tr className=' transition-all bg-zinc-100 text-black'>
                {PROJECT_FILED_HEADINGS.map((heading, index) => {
                  return (
                    <th
                      className={`px-4 py-2 capitalize font-semibold whitespace-nowrap ${
                        heading.center && 'text-center'
                      }`}
                      key={index}
                    >
                      {heading.title}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </Table>
        </div>
        <Pagination totalPage={totalPage} page={page} size={size} />
      </div>
    </>
  )
}

export default ProjectTable
