import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Modal from "@/modules/common/components/modal";
import { Institution, Service } from "../../types";
import { Input } from "@/modules/common/components/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue, useDisclosure } from "@nextui-org/react";
import ServicesView from "../services-view";

type Props = {
    servicesData: Service[]
    institution: Institution
    setInstitution: (institution: Institution) => void
}

export default function Services({ servicesData, institution, setInstitution }: Props) {
    const [services, setServices] = useState(institution?.services ? institution.services : [])
    const [search, setSearch] = useState<string>('')
    const [selectedKeys, setSelectedKeys] = useState(new Set(institution?.services ? institution.services.map(service => service.toString()) : []));
    const list = useMemo(
        () =>
            servicesData?.filter(option =>
                option?.name?.toLowerCase().includes(search.toLowerCase())
            ),
        [servicesData, search]
    )
    useEffect(() => {
        setInstitution({ ...institution, services: services })
    }, [services])

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    return (
        <>

            <ServicesView onOpen={onOpen} services={services} servicesData={servicesData} />

            <Modal key={1} isOpen={isOpen} onOpenChange={onOpenChange} title="Servicios" onClick={() => {
                if (selectedKeys === "all") {
                    setServices(servicesData.map(data => data.id))
                } else {
                    const list: number[] = []
                    selectedKeys.forEach((value) => {
                        list.push(Number(value))
                    })
                    setServices(list)
                }
                onClose()

            }}>
                <div className="h-[300px] w-full flex flex-col gap-2">
                    <Input className="sticky top-0 left-0 " startContent={<FiSearch />} onChange={(e) => { setSearch(e.target.value) }} />
                    <Table
                        classNames={{
                            base: "max-h-[260px] overflow-scroll",
                            table: "max-h-[260px]",
                            wrapper: "p-0 rounded-none",
                        }}
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        shadow="none" border={0}
                        isHeaderSticky
                    >
                        <TableHeader className="border-none shadow-none rounded-sm" columns={[{ key: 'name', label: "Nombre" }]}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={list}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Modal>
        </>


    );
}

