export interface UserTags {
  client_id: string;
  tag_id: string;
}
export interface CreateTagsUsersClientRepositoryDTO {
  client_tags: UserTags[];
}
