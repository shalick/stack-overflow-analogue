import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createPost, editPost } from "../../api/posts";
import { routes } from "../../routes";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";

const schema = z.object({
  language: z.string().nonempty(),
  attachedCode: z.string().nonempty(),
});
type Schema = z.infer<typeof schema>;

const progLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
];

const CreateSnippetForm = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const editMode = Boolean(postId);

  const {
    handleSubmit,
    control,
    // reset,
    formState: { isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      attachedCode: "",
      language: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Schema) => {
      if (editMode && postId) {
        return editPost(
          { code: data.attachedCode, language: data.language },
          postId
        );
      } else {
        return createPost({ code: data.attachedCode, language: data.language });
      }
    },
    onSuccess: () => {
      navigate(routes.userPosts);
    },
  });

  const onSubmit = (data: Schema) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create new snippet!
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mb: 1 }}>Language of your snippet:</Typography>
        <Controller
          name="language"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              displayEmpty
              variant="outlined"
              sx={{ mb: 3, backgroundColor: "white" }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {progLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Typography sx={{ mb: 1 }}>Code of your snippet:</Typography>
        <Controller
          name="attachedCode"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Editor
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              highlight={(code) =>
                highlight(code, languages.javascript, "javascript")
              }
              padding={10}
              textareaId="code-editor"
              textareaClassName="editor-textarea"
              style={{
                minHeight: "200px",
                backgroundColor: "#f5f5f5",
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: "1px solid #ccc",
                borderRadius: 4,
                marginBottom: 30,
              }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#007bff" }}
          disabled={isSubmitting}
        >
          Create Snippet
        </Button>
      </form>
    </Container>
  );
};

export default CreateSnippetForm;
