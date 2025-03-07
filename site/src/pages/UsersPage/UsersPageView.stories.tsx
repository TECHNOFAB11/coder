import { ComponentMeta, Story } from "@storybook/react"
import { createPaginationRef } from "components/PaginationWidget/utils"
import {
  MockUser,
  MockUser2,
  MockAssignableSiteRoles,
  mockApiError,
} from "testHelpers/entities"
import { UsersPageView, UsersPageViewProps } from "./UsersPageView"

export default {
  title: "pages/UsersPageView",
  component: UsersPageView,
  args: {
    paginationRef: createPaginationRef({ page: 1, limit: 25 }),
    isNonInitialPage: false,
    users: [MockUser, MockUser2],
    roles: MockAssignableSiteRoles,
    canEditUsers: true,
  },
} as ComponentMeta<typeof UsersPageView>

const Template: Story<UsersPageViewProps> = (args) => (
  <UsersPageView {...args} />
)

export const Admin = Template.bind({})

export const SmallViewport = Template.bind({})
SmallViewport.parameters = {
  chromatic: { viewports: [600] },
}

export const Member = Template.bind({})
Member.args = { canEditUsers: false }

export const Empty = Template.bind({})
Empty.args = { users: [] }

export const EmptyPage = Template.bind({})
EmptyPage.args = { users: [], isNonInitialPage: true }

export const Error = Template.bind({})
Error.args = {
  users: undefined,
  error: mockApiError({
    message: "Invalid user search query.",
    validations: [
      {
        field: "status",
        detail: `Query param "status" has invalid value: "inactive" is not a valid user status`,
      },
    ],
  }),
}
