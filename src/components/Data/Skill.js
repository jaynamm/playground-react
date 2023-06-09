const skill = [
  { title: 'BASH' },
  { title: '시스템' },
  { title: 'SAP' },
  { title: 'ORCAD' },
  { title: 'RTL' },
  { title: 'SCRUM' },
  { title: '서버' },
  { title: 'GIT' },
  { title: 'POWERBUILDER' },
  { title: 'SPRING BOOT' },
  { title: 'REVIT' },
  { title: 'ALTIUM' },
  { title: 'AKKA' },
  { title: 'KOTLIN' },
  { title: 'PADS LAYOUT' },
  { title: 'WINDOWS' },
  { title: 'MMO' },
  { title: '모바일 게임' },
  { title: 'ASP' },
  { title: 'MONGODB' },
  { title: 'UNITY3D' },
  { title: 'IBATIS' },
  { title: 'RABBITMQ' },
  { title: 'SNMP' },
  { title: 'MATLAB' },
  { title: 'TRELLO' },
  { title: '검색 엔진' },
  { title: '네트워크' },
  { title: 'NGINX' },
  { title: 'XCODE' },
  { title: 'HILT' },
  { title: '하드웨어' },
  { title: 'GOOGLE' },
  { title: 'WEBMASTER TOOLS' },
  { title: '.NET' },
  { title: 'EMR' },
  { title: 'RPG' },
  { title: 'EXCEL' },
  { title: 'CCIE' },
  { title: 'OPENCL' },
  { title: 'UBUNTU' },
  { title: 'POSTGRESQL' },
  { title: '보안' },
  { title: 'POWERSHELL' },
  { title: 'SCIKIT-LEARN' },
  { title: 'PYTORCH' },
  { title: 'DELPHI' },
  { title: 'VHDL' },
  { title: 'GUI' },
  { title: 'VM웨어' },
  { title: 'HMI' },
  { title: 'LIDAR' },
  { title: 'FTP' },
  { title: 'IVR' },
  { title: 'GCC' },
  { title: 'NEXACRO' },
  { title: 'SPARK' },
  { title: '데이터 시각화' },
  { title: 'REDMINE' },
  { title: 'OPENGL' },
  { title: 'SIP' },
  { title: 'PHPUNIT' },
  { title: 'QC' },
  { title: 'CTI' },
  { title: 'PCB 레이아웃 설계' },
  { title: 'WEBSPHEREMQ' },
  { title: 'ITIL' },
  { title: 'FLOW' },
  { title: 'PRODUCT MANAGEMENT' },
  { title: 'SASS' },
  { title: 'SOC' },
  { title: 'LINUX' },
  { title: 'OLAP' },
  { title: 'VBA' },
  { title: 'SPI' },
  { title: 'JUNIT' },
  { title: 'DIAGNOSTIC' },
  { title: 'APACHE 2' },
  { title: 'CRM' },
  { title: 'EMBEDDED' },
  { title: 'NEO4J' },
  { title: 'MIMO' },
  { title: 'WINFORM' },
  { title: 'C/C++' },
  { title: 'SHADER' },
  { title: '3G' },
  { title: 'OAUTH' },
  { title: 'CONFLUENCE' },
  { title: '펌웨어' },
  { title: '방화벽' },
  { title: 'NAS' },
  { title: 'SHELL' },
  { title: 'SSH' },
  { title: 'RUBY ON RAILS' },
  { title: 'QT' },
  { title: 'IOS' },
  { title: 'BITBUCKET' },
  { title: 'SYBASE' },
  { title: 'OOP' },
  { title: 'SPINE' },
  { title: 'ASIC' },
  { title: 'TENSORFLOW' },
  { title: 'SSIS' },
  { title: 'FPGA 프로토 타이핑' },
  { title: 'GIS' },
  { title: 'ZEMAX' },
  { title: 'ES6' },
  { title: 'STRUTS' },
  { title: 'SMS' },
  { title: 'CAD' },
  { title: 'REACT' },
  { title: 'MOBILE APP DESIGN' },
  { title: 'SAAS' },
  { title: 'ETHEREUM' },
  { title: '딥 러닝' },
  { title: 'ADC' },
  { title: '데이터 수집' },
  { title: 'IIS' },
  { title: 'EXPRESSJS' },
  { title: 'SERVLETS' },
  { title: 'ADOBE XD' },
  { title: 'GOOGLE APPS' },
  { title: 'UX' },
  { title: 'DB2' },
  { title: 'JSP' },
  { title: 'EAI' },
  { title: 'NEXT.JS' },
  { title: 'ISO' },
  { title: '통신' },
  { title: '소프트웨어 개발' },
  { title: 'RX' },
  { title: 'LESS' },
  { title: '서버 관리' },
  { title: '그래픽 디자인' },
  { title: 'NUMPY' },
  { title: 'OBJECTIVEC' },
  { title: 'PLC' },
  { title: 'CAM' },
  { title: 'OFDM' },
  { title: 'HTML' },
  { title: 'HTTP' },
  { title: 'ZEPLIN' },
  { title: 'TDD' },
  { title: 'JAVASCRIPT' },
  { title: 'XML' },
  { title: 'ADOBE PHOTOSHOP' },
  { title: 'OPENMP' },
  { title: 'SVG' },
  { title: 'BOOTSTRAP' },
  { title: 'GPS' },
  { title: 'USER EXPERIENCE' },
  { title: 'ORACLE' },
  { title: 'DATA ANALYSIS' },
  { title: 'APPLICANT TRACKING SYSTEM(ATS)' },
  { title: 'VR' },
  { title: 'FIREBASE' },
  { title: 'APACHE' },
  { title: 'VISUAL STUDIO CODE' },
  { title: 'AGILE' },
  { title: '앱 서버' },
  { title: 'DBT' },
  { title: 'IPS' },
  { title: 'SOLR' },
  { title: '소켓' },
  { title: 'ECLIPSE' },
  { title: 'PACS' },
  { title: 'SD' },
  { title: 'JQEURY' },
  { title: '암호화' },
  { title: 'SEO' },
  { title: 'SOLARIS' },
  { title: 'API' },
  { title: 'PADS' },
  { title: 'CISCO' },
  { title: '인공 지능' },
  { title: 'VISUAL BASIC' },
  { title: 'PCB 디자인' },
  { title: 'ROS' },
  { title: 'TABLEAU' },
  { title: 'RTOS' },
  { title: 'R' },
  { title: 'UNREAL ENGINE' },
  { title: 'REDUX' },
  { title: 'C#' },
  { title: '인터페이스' },
  { title: 'MFC' },
  { title: 'NOSQL' },
  { title: 'TYPEFORM' },
  { title: 'JUNIPER' },
  { title: 'INTELLIJ IDEA' },
  { title: 'VUE' },
  { title: 'MSSQL' },
  { title: '신호 처리' },
  { title: 'FPGA' },
  { title: 'MAVEN' },
  { title: 'SONET' },
  { title: 'VISUAL STUDIO' },
  { title: 'NLP' },
  { title: 'UDP' },
  { title: 'RESTFUL' },
  { title: 'ANDROID' },
  { title: '클라우드 컴퓨팅' },
  { title: 'CISSP' },
  { title: 'AUTOSAR' },
  { title: 'DOM' },
  { title: '금융' },
  { title: 'RF' },
  { title: 'I2C' },
  { title: 'RTP' },
  { title: 'AUDIT COMMAND LANGUAGE (ACL)' },
  { title: 'SPRING FRAMEWORK' },
  { title: 'PERL' },
  { title: 'PYTHON' },
  { title: 'WORDPRESS' },
  { title: 'SPSS' },
  { title: '컴퓨터 비전' },
  { title: 'STORAGE' },
  { title: 'JSTL' },
  { title: 'VOIP' },
  { title: '빅 데이터' },
  { title: '데이터베이스 설계' },
  { title: 'SVN' },
  { title: 'HADOOP' },
  { title: 'WPF' },
  { title: 'DATASTAGE' },
  { title: '구글 API' },
  { title: 'OTN' },
  { title: 'GRUNTJS' },
  { title: 'QA 엔지니어링' },
  { title: 'CUDA' },
  { title: 'CITRIX' },
  { title: 'GO' },
  { title: '네트워크 개발' },
  { title: 'TOMCAT' },
  { title: 'CAKEPHP' },
  { title: '웹 디자인' },
  { title: 'PKI' },
  { title: 'MVVM' },
  { title: 'AAC' },
  { title: 'GIMP' },
  { title: 'MICROCHIP PIC' },
  { title: 'BLOCKCHAIN' },
  { title: 'TELERIK' },
  { title: 'XEN' },
  { title: 'LIS' },
  { title: '데이터베이스' },
  { title: 'PAAS' },
  { title: 'AR' },
  { title: 'DNS' },
  { title: 'LINQ' },
  { title: '3D' },
  { title: 'WEBRTC' },
  { title: 'ETL 도구' },
  { title: 'JSON' },
  { title: '윈도우 프로그래밍' },
  { title: 'RAID' },
  { title: 'IP' },
  { title: 'ADOBE ILLUSTRATOR' },
  { title: 'CISA' },
  { title: 'STL' },
  { title: 'INFRA' },
  { title: 'COCOA' },
  { title: 'TOUCH' },
  { title: 'IOT' },
  { title: 'ENTITY FRAMEWORK' },
  { title: 'SCALA' },
  { title: 'ANGULAR' },
  { title: 'OPENSTACK' },
  { title: 'NOTION' },
  { title: 'OPENCV' },
  { title: 'GOOGLE ANALYTICS' },
  { title: 'REDIS' },
  { title: 'NFC' },
  { title: 'HTA' },
  { title: 'NODEJS' },
  { title: 'VDI' },
  { title: 'SAS' },
  { title: 'AXURE' },
  { title: 'AWS' },
  { title: 'GLSL' },
  { title: '데이터 마트' },
  { title: 'XAML' },
  { title: 'EDA' },
  { title: 'ANSI C' },
  { title: 'MXNET' },
  { title: 'ETL' },
  { title: 'CCNA' },
  { title: 'PMP' },
  { title: 'RUBY' },
  { title: 'DSP' },
  { title: 'ML' },
  { title: 'DEVOPS' },
  { title: 'KERNEL PROGRAMMING' },
  { title: 'SIMULINK' },
  { title: 'AZURE' },
  { title: 'FLASK' },
  { title: '솔루션 아키텍처' },
  { title: 'ORM' },
  { title: 'ABAP' },
  { title: 'FLUTTER' },
  { title: 'GCP' },
  { title: 'ARDUINO' },
  { title: 'SMTP' },
  { title: 'RHEL' },
  { title: 'TCP' },
  { title: 'OSS' },
  { title: 'STATA' },
  { title: 'XP' },
  { title: 'SPA' },
  { title: 'SQL' },
  { title: 'GPU' },
  { title: 'SCM' },
  { title: 'MDX' },
  { title: 'FIGMA' },
  { title: '무선 통신' },
  { title: 'SKETCHUP' },
  { title: 'UNIX' },
  { title: 'ACTIVE DIRECTORY' },
  { title: 'SDLC' },
  { title: 'TYPESCRIPT' },
  { title: 'POWER BI' },
  { title: 'KUBERNETES' },
  { title: 'RS232' },
  { title: 'XILINX' },
  { title: '백엔드 개발' },
  { title: 'DOCKER' },
  { title: 'METAL' },
  { title: 'SLACK' },
  { title: 'WEBGL' },
  { title: 'LARAVEL' },
  { title: '예측 모델링' },
  { title: 'HCI' },
  { title: 'CSS' },
  { title: 'RUST' },
  { title: 'GOOGLE TAG MANAGER' },
  { title: 'DIRECTX' },
  { title: 'SSL' },
  { title: 'MES' },
  { title: 'GOOGLE MAPS' },
  { title: 'NEST.JS' },
  { title: 'DSL' },
  { title: 'SOLIDWORKS' },
  { title: 'XAMARIN' },
  { title: 'SCIPY' },
  { title: 'VPN' },
  { title: 'TEAMCITY' },
  { title: 'CENTOS' },
  { title: '로봇' },
  { title: '서버 아키텍처' },
  { title: 'TCL' },
  { title: 'SSAS' },
  { title: 'FLASH' },
  { title: 'SVELTE' },
  { title: 'USER STORIES' },
  { title: 'CCNP' },
  { title: '가상화' },
  { title: 'FMEA' },
  { title: 'AIX' },
  { title: 'BGP' },
  { title: 'NODE.JS' },
  { title: 'LTE' },
  { title: 'RASPBERRY PI' },
  { title: 'JENKINS' },
  { title: 'ELASTICSEARCH' },
  { title: 'GRADLE' },
  { title: 'SPLUNK' },
  { title: 'MULTI TASKING' },
  { title: 'APACHE KAFKA' },
  { title: 'JIRA' },
  { title: 'RHINO 3D' },
  { title: '솔루션 개발' },
  { title: 'EC2' },
  { title: 'SKETCH' },
  { title: 'CODEIGNITER' },
  { title: 'PHP' },
  { title: 'AMAZON REDSHIFT' },
  { title: 'FASTAPI' },
  { title: 'DWDM' },
  { title: 'PERFORCE' },
  { title: 'ASANA' },
  { title: 'FRAMER' },
  { title: 'SQLITE' },
  { title: 'DLP' },
  { title: 'B2C' },
  { title: 'WBS' },
  { title: 'BI' },
  { title: 'CAN' },
  { title: 'RETROFIT2' },
  { title: 'DICOM' },
  { title: 'MIXPANEL' },
  { title: 'CMS' },
  { title: '웹 개발' },
  { title: 'B2B' },
  { title: 'ENCASE' },
  { title: 'LIN' },
  { title: 'STP' },
  { title: 'GRAPHQL' },
  { title: 'MVC' },
  { title: 'UI 디자인' },
  { title: 'JAVA' },
  { title: 'MYSQL' },
  { title: 'RDBMS' },
  { title: 'GCPS' },
  { title: 'ELIXIR' },
  { title: 'DJANGO' },
  { title: 'AJAX' },
  { title: 'AMPLITUDE' },
  { title: 'ADOBE' },
  { title: 'SWIFT' },
  { title: 'DART FOR PUBLISHERS' },
  { title: 'DHCP' },
  { title: 'JPA' },
  { title: 'VERILOG' },
];

export default skill;
