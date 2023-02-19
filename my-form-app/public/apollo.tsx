import CreateUserView from "./CreateUserView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface CreateUserFormModel {
  username: string;
  email: string;
  //... more fields here
}

const CreateUserFormSchema = yup.object().shape({
  username: yup.string().min(5).required(),
  email: yup.string().email().required()
  //... more fields here
});

interface Props {
  defaultValues: CreateUserFormModel;
  onSubmit: (data: CreateUserFormModel) => Promise<Response>;
}

const CreateUserLogic = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<CreateUserFormModel>({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(CreateUserFormSchema)
  });

  const handleSubmit = async (data: CreateUserFormModel) => {
    await onSubmit(data)
      .then(() => form.reset(data))
      .catch((err) => console.error(err));
  };

  return <CreateUserView form={form} onSubmit={handleSubmit} />;
};

export default CreateUserLogic;
