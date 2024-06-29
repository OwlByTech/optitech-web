import React, { ReactNode, useMemo, useState } from "react";
import { Modal as ModalUI, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { FiSearch, FiX } from "react-icons/fi";
import { Button } from "@/modules/common/components/button";
import Modal from "@/modules/common/components/modal";
import { Service } from "../../types";
import { Input } from "@/modules/common/components/input";

export default function Services({ servicesData, services, setServices }: { servicesData: Service[], services: any, setServices: any }) {

    const [search, setSearch] = useState<string>('')
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const list = useMemo(
        () =>
            servicesData?.filter(option =>
                option?.name?.toLowerCase().includes(search.toLowerCase())
            ),
        [servicesData, search]
    )
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(selectedKeys)
    return (
        <>
            <Button onPress={onOpen}>Agregar</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} title="Servicios">
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

