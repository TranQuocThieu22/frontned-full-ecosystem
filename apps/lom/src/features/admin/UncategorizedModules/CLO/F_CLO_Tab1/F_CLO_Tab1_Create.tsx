import { service_COECG } from "@/api/services/service_COECG";
import { service_COEPI } from "@/api/services/service_COEPI";
import MyButtonCreate from "@/components/ui/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { COECG } from "@/interfaces/shared-interfaces/COECG";
import { COECGPI } from "@/interfaces/shared-interfaces/COECGPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";


export default function F_CLO_Tab1_Create({ coeGradeSubjectId }: { coeGradeSubjectId?: number }) {
  const [selectedPIs, setSelectedPIs] = useState<COECGPI[]>([]);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [tempSelectedPIs, setTempSelectedPIs] = useState<COECGPI[]>([]);
  const disclosure = useDisclosure();

  const form = useForm<COECG>({
    initialValues: {
      code: '',
      description: '',
      coeCGPIs: [],
    },
    validate: {
      code: (value) => value ? null : 'Không được để trống',
      description: (value) => value ? null : 'Không được để trống',
      // coecgpi: (value) => {
      //   if (!value || value.length === 0) return 'Không được để trống';
      //   if (value.every(pi => pi.isEnabled === false)) return 'Không được để trống';
      //   return null;
      // },
    }
  });

  useEffect(() => {
    if (selectedPIs.length > 0) {
      const mappedPIs = selectedPIs.map(pi => ({
        id: 0,
        coepiId: pi.coepiId,
        isEnabled: true,
      }));

      form.setFieldValue("coecgpi", mappedPIs);
    } else {
      form.setFieldValue("coecgpi", []);
    }
  }, [selectedPIs]);

  const piQuery = useCustomReactQuery({
    queryKey: [`F_upgwbnmsn8_Tab1_Create_COEPI_GetAll`],
    axiosFn: async () => {
      const response = await service_COEPI.getAll();
      return response;
    },
  });

  useEffect(() => {
    if (popoverOpened) {
      setTempSelectedPIs([...selectedPIs]);
    }
  }, [popoverOpened, selectedPIs]);

  const mapPICodesToObjects = (piCodes: string[]): COECGPI[] => {
    if (!piQuery.data) return [];

    return piCodes.map(piCode => {
      const pi = piQuery.data.find(item => item.code === piCode);
      return {
        id: 0,
        coepiId: pi?.id,
        code: pi?.code,
        name: pi?.name
      } as COECGPI;
    }).filter(item => item.coepiId !== undefined);
  };

  return (
    <Group>
      <MyButtonCreate
        objectName="Chi tiết CG"
        form={form}
        disclosure={disclosure}
        onSubmit={async (values) => {
          // if (selectedPIs.length === 0) {
          //   form.setFieldError('coecgpi', 'Không được để trống');
          //   return Promise.reject(new Error('Vui lòng chọn ít nhất một PI'));
          // }

          const updatedValues = {
            ...values,
            coecgpi: selectedPIs.map(pi => ({
              id: 0,
              coepiId: pi.coepiId,
              isEnabled: true,
            })),
            coeGradeSubjectId: coeGradeSubjectId,
          };

          return await service_COECG.create(updatedValues).then(() => {
            form.reset();
            setSelectedPIs([]);
            setTempSelectedPIs([]);
          });

        }}
      >
        <MyTextInput label="Mã CG" {...form.getInputProps("code")} />

        {/* <div style={{ position: 'relative' }}>
          <Popover
            opened={popoverOpened}
            onChange={setPopoverOpened}
            zIndex={200}
            styles={{
              dropdown: {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '80vh',
                overflow: 'auto'
              }
            }}
          >
            <Popover.Target>
              <MultiSelect
                label="PI"
                value={selectedPIs.map(pi => pi.code || '')}
                data={selectedPIs.map((pi) => ({ value: pi.code || '', label: pi.code || '' }))}
                onClick={() => setPopoverOpened(true)}
                readOnly
                onFocus={() => setPopoverOpened(true)}
                error={form.errors.coecgpi}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <F_upgwbnmsn8_Tab1_Pi_Read
                selectedPIs={tempSelectedPIs.map(pi => pi.code as string)}
                setSelectedPIs={(piCodes) => {
                  setTempSelectedPIs(mapPICodesToObjects(piCodes));
                }}
                onConfirm={() => {
                  setSelectedPIs([...tempSelectedPIs]);
                  setPopoverOpened(false);
                }}
                onCancel={() => {
                  setPopoverOpened(false);
                }}
              />
            </Popover.Dropdown>
          </Popover>
        </div> */}

        < Textarea label="Mô tả" placeholder="Nhập mô tả" {...form.getInputProps("description")} />
      </MyButtonCreate>
    </Group >
  );
}
