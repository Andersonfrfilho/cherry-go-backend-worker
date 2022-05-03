import { DOCUMENT_SIDE_ENUM } from "@modules/accounts/enums/DocumentSide.enum";

export interface CreateDocumentsUsersServiceDTO {
  document_file: string;
  user_id: string;
  description: DOCUMENT_SIDE_ENUM;
}
