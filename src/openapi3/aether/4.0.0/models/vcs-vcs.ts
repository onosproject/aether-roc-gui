// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
/* eslint-disable */
import {AdditionalPropertyUnchanged} from './additional-property-unchanged';
import {VcsVcsApplication} from './vcs-vcs-application';
import {VcsVcsDeviceGroup} from './vcs-vcs-device-group';
import {TemplateTemplateDeviceMbr} from "./template-template-device-mbr";
import {TemplateTemplateSliceMbr} from "./template-template-slice-mbr";
import {VcsVcsDeviceMbr} from "./vcs-vcs-device-mbr";
import {VcsVcsSliceMbr} from "./vcs-vcs-slice-mbr";

export interface VcsVcs {

    /**
     * A list of applications to allow and/or deny. Rules are executed in
     * priority order. The first rule to match will determine the fate
     * of the packet
     */
    filter?: Array<VcsVcsApplication>;

    /**
     * description of this vcs
     */
    description?: string;

    /**
     * A list of device groups. Groups will only participate in
     * the VCS if the enable field is set to True
     */
    'device-group'?: Array<VcsVcsDeviceGroup>;

    /**
     * display name to use in GUI or CLI
     */
    'display-name'?: string;

    /**
     * Link to enterprise that owns this VCS
     */
    enterprise: string;

    /**
     * ID for this vcs.
     */
    id: string;

    /**
     * Slice differentiator. Immutable.
     */
    sd: number;

    /**
     * Slice/Service type. Immutable.
     */
    sst: number;

    /**
     * Link to user vcs template that was used to initialize
     * this VCS
     */
    template?: string;

    /**
     * Link to traffic class
     */
    'traffic-class': string;

    /**
     * Link to user plane that implements this vcf
     */
    upf?: string;

    /**
     * Per-device QOS Settings
     */
    device?: VcsVcsDeviceMbr;

    /**
     * Per-Slice QOS Settings
     */
    slice?: VcsVcsSliceMbr;

    [key: string]: AdditionalPropertyUnchanged | Array<VcsVcsApplication> | Array<VcsVcsDeviceGroup> | VcsVcsDeviceMbr | VcsVcsSliceMbr | number | string | undefined;
}
