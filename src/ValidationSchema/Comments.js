import * as Yup from "yup";

export const CommentSchema = Yup.object().shape({
  comment: Yup.string().required("Please enter your comment.").min(1, "Use 1 characters or more for comment.").max(500, "Use 500 characters or fewer for comment"),
});
