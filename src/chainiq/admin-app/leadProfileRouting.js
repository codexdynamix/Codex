import { ROLE } from './shared';

const ROLE_ROUTE_SEGMENTS = {
  [ROLE.SUPER_ADMIN]: 'super-admin',
  [ROLE.OFFICE_MANAGER]: 'office-manager',
  [ROLE.TEAM_LEADER]: 'team-leader',
  [ROLE.AGENT]: 'agent',
};

export function getRoleWorkspacePath(role, userId) {
  const segment = ROLE_ROUTE_SEGMENTS[role];
  // These paths are consumed by the nested MemoryRouter mounted at /admin.
  // Including the outer /admin prefix makes React Router miss the role route
  // and fall through to the backoffice landing page.
  if (!segment || !userId) return '/';
  return `/${segment}/${encodeURIComponent(userId)}`;
}

export function getLeadProfilePath(role, userId, leadId) {
  if (!leadId) return getRoleWorkspacePath(role, userId);
  return `${getRoleWorkspacePath(role, userId)}/lead/${encodeURIComponent(leadId)}`;
}

export function getRoleScopedLeads(data, role, user) {
  const leads = data?.leads || [];
  if (!user) return [];

  switch (role) {
    case ROLE.SUPER_ADMIN:
      return leads;
    case ROLE.OFFICE_MANAGER:
      return leads.filter((lead) => lead.assignedToOffice === user.officeId);
    case ROLE.TEAM_LEADER:
      return leads.filter((lead) => lead.assignedToTeam === user.teamId);
    case ROLE.AGENT:
      return leads.filter((lead) => lead.assignedToAgent === user.id);
    default:
      return [];
  }
}