import Button from "../../../components/button";
import Input from "../../../components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormData } from "./schemas/create-schema";
import { useForm } from "react-hook-form";
import { useMutationLinkCreate } from "../../../querys/links";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function LinkCreate() {
    const { handleSubmit, register, reset, setFocus, formState: { errors } } = useForm({ resolver: zodResolver(linkSchema), mode: 'onChange', shouldFocusError: true })

    const { mutate, isPending } = useMutationLinkCreate()
    const queryClient = useQueryClient();

    const onSubmit = (data: LinkFormData) => {
        mutate(data, {
            onSuccess: () => {
                reset();

                toast.success('Link criado com sucesso!', { autoClose: 1000 });
                queryClient.invalidateQueries({ queryKey: ['GET_LINKS'] });

            },
            onError: (error) => {
                toast.error(error.message, { autoClose: 3000 })
                setFocus('urlShort', { shouldSelect: true })
            }
        });
    }

    const domain = `${window.location.host}/`;


    return (
        <div className="flex flex-col px-5 py-10 bg-white rounded-lg gap-5 h-min flex-auto  shadow-md lg:max-w-md min-[500px]:px-10">
            <h2>Novo Link</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Input
                    id="urlDestination"
                    {...register('urlDestination')}
                    error={errors.urlDestination?.message}
                    label="LINK ORIGINAL"
                    placeholder="https://www.example.com"
                />
                <Input
                    id="urlShort"
                    {...register('urlShort')}
                    error={errors.urlShort?.message}
                    label="LINK ENCURTADO"
                    placeholder="abc123"
                    prefix={domain}

                />
                <Button type="submit" disabled={isPending} loading={isPending}>Salvar link</Button>
            </form>
        </div>
    )
}