import AppCopyText from '@/components/ui/app-copy-text';

export default function DetailEntitas({ entitas }: { entitas: any }) {
    // console.log(getEntitas)
    return (
        <div>
            {entitas.nomor_identitas &&
                <div className='text-xs font-normal'>
                    {((entitas.nomor_identitas).length === 15) ?
                        (<div>
                            <p>NPWP 15 DIGIT : {entitas.nomor_identitas}</p>
                            <p>NPWP 16 DIGIT : {'0' + entitas.nomor_identitas}</p>
                            <div className='flex flex-row'>
                                NITKU :
                                <AppCopyText textToCopy={'0' + entitas.nomor_identitas + '000000'}>
                                    {'0' + entitas.nomor_identitas + '000000'}
                                </AppCopyText>
                            </div>
                        </div>)
                        :
                        (<div>
                            <div className='flex flex-row'>
                                NITKU :
                                <AppCopyText textToCopy={entitas.nomor_identitas}>
                                    {entitas.nomor_identitas}
                                </AppCopyText>
                            </div>
                        </div>)
                    }

                    {entitas.nib_entitas &&
                        <div>
                            <div className='flex flex-row'>
                                NIB :
                                <AppCopyText textToCopy={entitas.nib_entitas}>
                                    {entitas.nib_entitas}
                                </AppCopyText>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
