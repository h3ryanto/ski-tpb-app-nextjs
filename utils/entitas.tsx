import DetailEntitas from "@/utils/detailentitas";

export default function Entitas({ getEntitas, kode_dokumen }: { getEntitas: any, kode_dokumen?: string }) {
    // console.log(getEntitas)
    return (
        <div>
            {getEntitas && getEntitas.map((entitas: any) => (
                <div key={entitas.id}>
                    {((kode_dokumen === '23') && (entitas.kode_entitas === '5')) ?
                        <div>
                            <div className="mb-3">{entitas.nama_entitas}</div>
                            <DetailEntitas entitas={entitas} />
                        </div>
                        : ((kode_dokumen === '40') && (entitas.kode_entitas === '9')) ?
                            <div>
                                <div className="mb-3">{entitas.nama_entitas}</div>
                                <DetailEntitas entitas={entitas} />
                            </div>
                            : ((kode_dokumen === '27') && (entitas.kode_entitas === '3')) ?
                                <div>
                                    <div className="mb-3">{entitas.nama_entitas}</div>
                                    <DetailEntitas entitas={entitas} />
                                </div>
                                : ((kode_dokumen === '30') && (entitas.kode_entitas === '8')) ?
                                    <div>
                                        <div className="mb-3">{entitas.nama_entitas}</div>
                                        <DetailEntitas entitas={entitas} />
                                    </div>
                                    : ((kode_dokumen === '262') && (entitas.kode_entitas === '9')) ?
                                        <div>
                                            <div className="mb-3">{entitas.nama_entitas}</div>
                                            <DetailEntitas entitas={entitas} />
                                        </div>
                                        : ((kode_dokumen === '261') && (entitas.kode_entitas === '8')) ?
                                            <div>
                                                <div className="mb-3">{entitas.nama_entitas}</div>
                                                <DetailEntitas entitas={entitas} />
                                            </div>
                                            : ((kode_dokumen === '41') && (entitas.kode_entitas === '8')) ?
                                                <div>
                                                    <div className="mb-3">{entitas.nama_entitas}</div>
                                                    <DetailEntitas entitas={entitas} />
                                                </div>
                                                : ((kode_dokumen === '25') && (entitas.kode_entitas === '8')) ?
                                                    <div>
                                                        <div className="mb-3">{entitas.nama_entitas}</div>
                                                        <DetailEntitas entitas={entitas} />
                                                    </div>
                                                    : ((kode_dokumen === '33') && (entitas.kode_entitas === '8')) ?
                                                        <div>
                                                            <div className="mb-3">{entitas.nama_entitas}</div>
                                                            <DetailEntitas entitas={entitas} />
                                                        </div>
                                                        : null
                    }

                </div>
            ))}

        </div>
    )
}
